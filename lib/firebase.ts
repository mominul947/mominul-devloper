const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyBwPMcAk1gySONANHV7Cs-GiqTAcMNYR6A'
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'mominuldev'
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`

export async function savePaymentToFirestore(record: {
  id: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  senderNumber: string
  trxId: string
  amount: number
  method: string
  package: string
  status: string
  createdAt: string
  updatedAt: string
  notes?: string
}): Promise<boolean> {
  try {
    const url = `${FIRESTORE_BASE_URL}/web_payments/${encodeURIComponent(record.id)}?key=${FIREBASE_API_KEY}`
    const payload = {
      fields: {
        id: { stringValue: record.id },
        clientName: { stringValue: record.clientName || '' },
        clientPhone: { stringValue: record.clientPhone || '' },
        clientEmail: { stringValue: record.clientEmail || '' },
        senderNumber: { stringValue: record.senderNumber || '' },
        trxId: { stringValue: record.trxId || '' },
        amount: { doubleValue: Number(record.amount || 0) },
        method: { stringValue: record.method || '' },
        package: { stringValue: record.package || '' },
        status: { stringValue: record.status || 'pending' },
        createdAt: { stringValue: record.createdAt || new Date().toISOString() },
        updatedAt: { stringValue: record.updatedAt || new Date().toISOString() },
        notes: { stringValue: record.notes || '' },
      },
    }

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.warn('Firestore payment save response not ok:', res.status, errText)
      return false
    }

    return true
  } catch (err) {
    console.warn('Firestore payment save error (silent fallback):', err)
    return false
  }
}

export async function updatePaymentInFirestore(id: string, status: string): Promise<boolean> {
  try {
    const url = `${FIRESTORE_BASE_URL}/web_payments/${encodeURIComponent(id)}?updateMask.fieldPaths=status&updateMask.fieldPaths=updatedAt&key=${FIREBASE_API_KEY}`
    const payload = {
      fields: {
        status: { stringValue: status },
        updatedAt: { stringValue: new Date().toISOString() },
      },
    }

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return res.ok
  } catch (err) {
    console.warn('Firestore payment update error:', err)
    return false
  }
}
