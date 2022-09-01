export interface OrderData{
    id: string;
    customerId: string;
    customerName: string;
    pickupAddressId: string;
    deliveryAddressId: string;
    productId: string;
    productName: string;
    orderStateId: number;
    orderStateName: string;
    orderCode: string;
    errors: string;
}