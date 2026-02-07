import React from 'react';

const OwnerProfileCard = ({ owner, onEdit }) => {
    return (
        <div className="owner-profile-card" style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
            <img
                src={owner.picture || 'https://via.placeholder.com/150'}
                alt="Owner"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h3>{owner.full_name || owner.fullName || 'Owner Name'}</h3>
            <p>{owner.email}</p>
            <p>{owner.phone}</p>
            <p>{owner.wilaya}</p>
            <button onClick={onEdit} style={{ marginTop: '10px', padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Edit Profile
            </button>
        </div>
    );
};

export default OwnerProfileCard;
