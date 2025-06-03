import { Response } from 'express';
import HttpStatus from 'http-status';

export const SuccessResponse = (res: Response, data: any = {}) => {
  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    status: true,
    data,
  });
};

export const SuccessMessages = {
  userCreated: {
    en: 'User created successfully',
    ar: 'تم إنشاء المستخدم بنجاح',
  },
  userUpdated: {
    en: 'User updated successfully',
    ar: 'تم تحديث المستخدم بنجاح',
  },
  userDeleted: {
    en: 'User deleted successfully',
    ar: 'تم حذف المستخدم بنجاح',
  },
  userLoggedIn: {
    en: 'User logged in successfully',
    ar: 'تم تسجيل دخول المستخدم بنجاح',
  },
  userLoggedOut: {
    en: 'User logged out successfully',
    ar: 'تم تسجيل خروج المستخدم بنجاح',
  },
  passwordChanged: {
    en: 'Password changed successfully',
    ar: 'تم تغيير كلمة المرور بنجاح',
  },
  emailSent: {
    en: 'Email sent successfully',
    ar: 'تم إرسال البريد الإلكتروني بنجاح',
  },
  checkYourMail: {
    en: 'Please check your email',
    ar: 'يرجى التحقق من بريدك الإلكتروني',
  },
  deletedSuccessfully: {
    en: 'Deleted successfully',
    ar: 'تم الحذف بنجاح',
  },
};
