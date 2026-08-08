export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    type: 'apartment' | 'house' | 'villa' | 'studio';
    bedrooms: number;
    bathrooms: number;
    area_sqft: number;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    images: string[];       // array of Supabase Storage URLs
    is_featured: boolean;
    is_sold: boolean;
    created_at: string;
}

export interface User {
    id: string;
    clerk_id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    is_admin: boolean;
    created_at: string;
}

export interface SavedProperty {
    id: string;
    user_clerk_id: string;
    property_id: string;
    created_at: string;
}
