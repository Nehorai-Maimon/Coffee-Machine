import mongoose,{Schema,Document} from 'mongoose';

// define types
export interface IOrder extends Document{
    name: string;
    title: 'Employee' | 'Boss';
    delayMinutes: number;
    done: boolean;
    status: 'pending' | 'preparing' | 'ready';
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema : Schema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        title:{
            type: String,
            enum:['Employee' , 'Boss'],
            required: true
        },
        delayMinutes: {
            type: Number,
            required: true
        },
        done:{
            type: Number,
            default: false
        },
        status:{
            type: String,
            enum: ['pending' ,'preparing' , 'ready'],
            default: 'pending'
        }
    },
    {
        timestamps:true
    }
);

export default mongoose.model<IOrder>('Order',OrderSchema);