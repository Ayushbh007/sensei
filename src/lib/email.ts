import emailjs from '@emailjs/browser';

type EmailParams = Record<string, string>;

let isInitialized = false;

export function initEmailJS() {
  if (!isInitialized && typeof window !== 'undefined') {
    emailjs.init('xil_Yf0d6m5EfRPRv');
    isInitialized = true;
  }
}

export async function sendEmail(templateParams: EmailParams) {
  try {
    if (!isInitialized) {
      initEmailJS();
    }
    
    const response = await emailjs.send(
      'service_abc123',
      'college_registration',
      templateParams
    );
    
    return { success: true, response };
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    return { 
      success: false, 
      error: error?.text || error?.message || 'Failed to send email'
    };
  }
}

export { emailjs };
