import { useSelector,useDispatch } from 'react-redux';
import { increment,decrement,deleteMilhojas } from '../../feature/products/productSlice';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import cart from './cart.module.css';
import Image from 'next/image';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shoppingCartArray = useSelector((state)=>state.products.shoppingCart);
  const data = useSelector((state)=>state.products.cake);

  const totalPrice = shoppingCartArray.reduce((acc, prod) => acc + parseFloat(prod.price), 0);

  const handleDeleteProduct = (product) => {
    dispatch(deleteMilhojas(product))
  }

  const hanldeBuy = () => {
    router.push('/LogIn/LogIn');
  }

  const handleStillBuying = () => {
    router.push('/Cake/Cake');
  }
  return(
    <section className={cart.principalCart}>
      {shoppingCartArray.map((product)=>{
        return(
          <section key={product._id} className={cart.principalCart__container}>
            <Image src={product?.image} alt="" className={cart.principalCart__image} width={100} height={100}/>
              <section className={cart.principalCart__detail}>
                <section className={cart.principalCart__detailGroup}>
                  <h3 className={cart["principalCart__detail--title"]}>Producto</h3>
                  <button type="submit" className={cart["principalCart__detail--trash"]} onClick={()=>handleDeleteProduct(product._id)} >
                    <FontAwesomeIcon icon={faTrash} className={cart["principalCart__detail--trashIcon"]} />
                  </button>

                </section>

                <h3 className={cart["principalCart__detail--value"]}>{product?.milhojaName}</h3>
                <h3 className={cart["principalCart__detail--title"]}>Tamaño</h3>
                <p className={cart["principalCart__detail--value"]}>{product?.size}</p>
                <h3 className={cart["principalCart__detail--title"]}>Cantidad</h3>
                <section className={cart.principalCart__amount}>
                  <button type="submit" className={cart.principalCart__subtraction} onClick={() => dispatch(decrement())}>-</button>
                  <label htmlFor="taste" className={cart["principalCart__amount--am"]}>{product.amount}</label>
                  <button type="submit" className={cart.principalCart__add} onClick={() => dispatch(increment(product._id))}>+</button>
                </section>
                <h3 className={cart["principalCart__detail--title"]}>Subtotal</h3>
                <p className={cart["principalCart__detail--value"]}>{product?.price}</p>
                <hr  align="right"  size="2"  noshade="noshade"/>

              </section>
          </section>
        )
      })}
      <section className={cart["principalCart__detail--total"]}>
        <h1 className={cart["principalCart__detail--totalTitle"]}>Total:</h1>
        <p className={cart["principalCart__detail--totalAmount"]}>{totalPrice.toFixed(3)}</p>
      </section>

      <section className={cart.principalCart__buttons}>
        <button type="submit" className={cart["principalCart__buttons--style"]} onClick={hanldeBuy}>Pagar</button>
        <button type="submit" className={cart["principalCart__buttons--style"]} onClick={handleStillBuying}>Seguir comprando</button>
      </section>






    </section>
  )
}

export default Cart;
