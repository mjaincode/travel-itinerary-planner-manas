import { useState } from 'react'

export default function App() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    duration: 3,
    interests: []
  })
  const [itinerary, setItinerary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ⚠️ Yahan apna Render backend URL daalna hai deploy karne ke baad
  const API_URL = 'https://your-backend-url.onrender.com'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/generate-itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setItinerary(data.itinerary || 'No response from server')
    } catch (err) {
      setError('Server se connect nahi ho pa raha. Backend URL check karein.')
    } finally {
      setLoading(false)
    }
  }

  const interests = ['Food', 'Sightseeing', 'Adventure', 'Culture', 'Shopping', 'Nature']

  return (
    <div style={styles.page}>
      <h1>✈️ Personalized Travel Itinerary Planner</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.col}>
            <label>Destination</label>
            <input 
              required
              value={formData.destination}
              onChange={e => setFormData({...formData, destination: e.target.value})}
              placeholder="e.g. Manali, Goa, Jaipur"
              style={styles.input}
            />
          </div>
          <div style={styles.col}>
            <label>Budget</label>
            <input 
              required
              value={formData.budget}
              onChange={e => setFormData({...formData, budget: e.target.value})}
              placeholder="e.g. ₹15000"
              style={styles.input}
            />
          </div>
          <div style={styles.col}>
            <label>Duration (Days)</label>
            <input 
              type="number"
              min="1"
              value={formData.duration}
              onChange={e => setFormData({...formData, duration: parseInt(e.target.value) || 1})}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Interests</label>
          <div style={styles.chips}>
            {interests.map(int => (
              <label key={int} style={styles.chipLabel}>
                <input
                  type="checkbox"
                  checked={formData.interests.includes(int)}
                  onChange={() => {
                    const current = formData.interests.includes(int)
                      ? formData.interests.filter(i => i !== int)
                      : [...formData.interests, int]
                    setFormData({...formData, interests: current})
                  }}
                  style={styles.checkbox}
                />
                {int}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}
      
      {itinerary && (
        <div style={styles.result}>
          <h2>📝 Your Itinerary</h2>
          <pre style={styles.pre}>{itinerary}</pre>
        </div>
      )}

      <div style={styles.footer}>
        Built with React + FastAPI for SmartBridge EL Program
      </div>
    </div>
  )
}

const styles = {
  page: { maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px', color: '#333' },
  h1: { textAlign: 'center', color: '#2563eb' },
  form: { background: '#f8fafc', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' },
  col: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', fontWeight: '600' },
  input: { padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  chipLabel: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' },
  checkbox: { width: '16px', height: '16px' },
  button: { background: '#2563eb', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  buttonDisabled: { opacity: 0.6 },
  error: { color: '#dc2626', marginTop: '12px', fontSize: '14px' },
  result: { marginTop: '24px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '20px' },
  pre: { whiteSpace: 'pre-wrap', fontSize: '15px', lineHeight: '1.6' },
  footer: { marginTop: '30px', textAlign: 'center', fontSize: '13px', color: '#64748b' }
}