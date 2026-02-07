import React, { useState } from 'react';

const ProfilePopup = ({ owner, onClose, API_BASE, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        full_name: owner?.full_name ?? owner?.fullName ?? '',
        fullName: owner?.full_name ?? owner?.fullName ?? '',
        phone: owner?.phone ?? '',
        wilaya: owner?.wilaya ?? '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value, full_name: name === 'fullName' ? value : prev.full_name }));
    };

    const handleSave = async () => {
        if (!API_BASE || !owner?.id) return;
        setSaving(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/aishaWork/ownerProfileUpdate.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    owner_id: owner.id,
                    fullName: formData.fullName || formData.full_name,
                    phone: formData.phone,
                    wilaya: formData.wilaya,
                }),
            });
            const data = await res.json();
            if (data.status === 'success') {
                if (typeof onSaveSuccess === 'function') onSaveSuccess(data.owner);
                onClose();
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="popup-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="popup-content" style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
                <h3>Edit Profile</h3>

                <div style={{ marginBottom: '10px' }}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || formData.full_name || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Wilaya</label>
                    <input
                        type="text"
                        name="wilaya"
                        value={formData.wilaya || ''}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button onClick={onClose} disabled={saving} style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePopup;
