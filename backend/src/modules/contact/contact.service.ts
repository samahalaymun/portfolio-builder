import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateContactDto, UpdateContactStatusDto } from './dto/contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Contact, ContactStatus } from '@prisma/client';


@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new contact form submission
   */
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const contact = await this.prisma.contact.create({
        data: {
          name: createContactDto.name.trim(),
          email: createContactDto.email.toLowerCase().trim(),
          subject: createContactDto.subject.trim(),
          message: createContactDto.message.trim(),
          status: ContactStatus.PENDING,
        },
      });

      // TODO: Send email notification to admin
      // await this.sendAdminNotification(contact);

      // TODO: Send confirmation email to user
      // await this.sendUserConfirmation(contact);

      return contact;
    } catch (error) {
      throw new BadRequestException('Failed to submit contact form');
    }
  }

  /**
   * Get all contact submissions (Admin only)
   */
  async findAll(
    page: number = 1,
    limit: number = 20,
    status?: ContactStatus,
  ): Promise<{ data: Contact[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [data, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.contact.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  /**
   * Get a single contact by ID (Admin only)
   */
  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    // Auto-mark as READ when viewed
    if (contact.status === ContactStatus.PENDING) {
      return this.updateStatus(id, { status: ContactStatus.READ });
    }

    return contact;
  }

  /**
   * Update contact status (Admin only)
   */
  async updateStatus(
    id: string,
    updateContactStatusDto: UpdateContactStatusDto,
  ): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return this.prisma.contact.update({
      where: { id },
      data: {
        status: updateContactStatusDto.status,
      },
    });
  }

  /**
   * Delete a contact (Admin only)
   */
  async remove(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return this.prisma.contact.delete({
      where: { id },
    });
  }

  /**
   * Get contact statistics (Admin only)
   */
  async getStats(): Promise<{
    total: number;
    pending: number;
    read: number;
    replied: number;
    archived: number;
    todayCount: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [total, pending, read, replied, archived, todayCount] =
      await Promise.all([
        this.prisma.contact.count(),
        this.prisma.contact.count({ where: { status: ContactStatus.PENDING } }),
        this.prisma.contact.count({ where: { status: ContactStatus.READ } }),
        this.prisma.contact.count({ where: { status: ContactStatus.REPLIED } }),
        this.prisma.contact.count({
          where: { status: ContactStatus.ARCHIVED },
        }),
        this.prisma.contact.count({
          where: {
            createdAt: {
              gte: today,
            },
          },
        }),
      ]);

    return {
      total,
      pending,
      read,
      replied,
      archived,
      todayCount,
    };
  }

  // TODO: Implement email notification methods
  // private async sendAdminNotification(contact: Contact): Promise<void> {
  //   // Send email to admin about new contact submission
  // }

  // private async sendUserConfirmation(contact: Contact): Promise<void> {
  //   // Send confirmation email to user
  // }
}
