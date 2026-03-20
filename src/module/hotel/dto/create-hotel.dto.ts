export class CreateHotelDto {
    hotel_name: string
    description?: string
    status?: string
    isActive?: boolean
    auth_id: number
    location_id: number
}
