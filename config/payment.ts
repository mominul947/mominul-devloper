/**
 * PAYMENT CONFIGURATION
 */

export const paymentConfig = {
  // Mobile Banking Numbers (Personal)
  bkashNumber: process.env.NEXT_PUBLIC_BKASH_NUMBER || '01710718308',
  nagadNumber: process.env.NEXT_PUBLIC_NAGAD_NUMBER || '01727852771',

  // Cellfin / Islami Bank Limited
  cellfinBankName: 'ISLAMI BANK BANGLADESH LIMITED',
  cellfinBranch: 'BOGRA BRANCH',
  cellfinRoutingNumber: '125100377',
  cellfinAccountName: 'MD. MOHIDUL ISLAM',
  cellfinAccountNumber: '20501120206017410',

  // Mercantile Bank Limited
  bankName: 'MERCANTILE BANK LIMITED',
  bankBranch: 'KALAI BRANCH, JOYPURHAT',
  bankRoutingNumber: '140380464',
  bankAccountName: 'MD. MOHIDUL ISLAM',
  bankAccountNumber: '1121009627523',
  
  // minimum payment amount (BDT)
  minAmount: 300,

  // Service / Gateway info
  gatewayName: 'Secure Pay',
  gatewaySubtitle: 'Payment Verification Portal',
}
