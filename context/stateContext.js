'use client';
import react ,{useState,  createContext,useEffect}from 'react';
import toast from 'react-hot-toast';

const context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    

    return(
        <context.Provider value={{}}>
            {children}
        </context.Provider>
    )
}