'use client';
import react ,{useState,  createContext,useContext,useEffect}from 'react';
import toast from 'react-hot-toast';
import { set } from 'sanity';

const context = createContext();

export const StateContext = ({children}) =>{

  

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

       useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cartItems');
            const savedTotal = localStorage.getItem('totalPrice');
            const savedQuantities = localStorage.getItem('totalQuantities');

            if (savedCart) setCartItems(JSON.parse(savedCart));
            if (savedTotal) setTotalPrice(parseFloat(savedTotal));
            if (savedQuantities) setTotalQuantities(parseInt(savedQuantities));
        }
    }, []);

     useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('totalPrice', totalPrice.toString());
            localStorage.setItem('totalQuantities', totalQuantities.toString());
        }
    }, [cartItems, totalPrice, totalQuantities]);


         let foundProduct;
         let index;


    const onAdd =(product, quantity)=>{
         const checkProductInCart = cartItems.find(item => item._id === product._id);
          setTotalPrice((prevTotalPrice) =>  prevTotalPrice + product.price * quantity);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

         if(checkProductInCart){
           

            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            });
            setCartItems(updatedCartItems);
           
         }else{
            product.quantity= quantity;
            setCartItems([...cartItems, {...product}]);
         };

          toast.success(`${qty} ${product.name} added to the cart`);

    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }


   const toggleCartItemQuantity = (id, value) => {
    const index = cartItems.findIndex((product) => product._id === id);
    
    if (index === -1) return; // Item not found
    
    const foundProduct = cartItems[index];
    
    if (value === 'inc') {
        const newCartItems = [...cartItems];
        newCartItems[index] = {
            ...foundProduct,
            quantity: foundProduct.quantity + 1
        };
        setCartItems(newCartItems);
        setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        
    } else if (value === 'dec') {
        if (foundProduct.quantity > 1) {
            const newCartItems = [...cartItems];
            newCartItems[index] = {
                ...foundProduct,
                quantity: foundProduct.quantity - 1
            };
            setCartItems(newCartItems);
            setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price); 
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
        }
    }
}
    
       const incQty = () =>{
        setQty((prevQty)=> prevQty + 1)
       }

        const decQty = () =>{
           setQty( (prevQty) => { if(prevQty -1 < 1) return 1;
            return prevQty -1});
       }

    return(
        <context.Provider value={{
            setShowCart,
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            toggleCartItemQuantity,
            decQty,
            incQty,
            onAdd,
            onRemove
        }}>
            {children}
        </context.Provider>
    )
}

export const useStateContext = () => useContext(context);