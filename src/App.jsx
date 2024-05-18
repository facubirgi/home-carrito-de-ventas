import { useState, useEffect } from "react"
import { db } from "./data/db"
import Header from "./Componentes/Header"
import Guitarra from "./Componentes/Guitarra"

function App() {

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const[data] = useState(db)
    const[cart, setCart] = useState(initialCart)

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    function addToCart(item){
        const itemExists = cart.findIndex(guitarra => guitarra.id === item.id)
        if(itemExists >=0){
            if(cart[itemExists].quantity >= 5) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCart(updateCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    function removeFromCart(id){
        setCart( prevCart=> prevCart.filter(guitarra => guitarra.id !== id))
    }

    function incrementoCantidad(id){
        const updateCart = cart.map(item =>{
            if(item.id === id && item.quantity<5){
                return{
                    ...item,
                    quantity: item.quantity+1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decrementoCantidad(id){
        const updateCart = cart.map(item =>{
            if(item.id === id && item.quantity>1){
                return{
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function limpiarCarrito(){
        setCart([])
    }
    

  return (
    <>
    <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        incrementoCantidad = {incrementoCantidad}
        decrementoCantidad = {decrementoCantidad}
        limpiarCarrito = {limpiarCarrito}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitarra)=>(
                    <Guitarra
                        key={guitarra.id}
                        guitarra={guitarra}
                        setCart={setCart}
                        addToCart={addToCart}
                    />
            ))}       
        </div>
        
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
