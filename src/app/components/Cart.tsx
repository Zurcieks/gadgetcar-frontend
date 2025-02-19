import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {useGetCartQuery, useRemoveItemMutation } from "../../redux/cartApi";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCartItems } from "@/redux/cartSlice";
 
interface CartProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Cart({ open, setOpen }: CartProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const { data} = useGetCartQuery();
  const [removeItem] = useRemoveItemMutation();
 
 
  useEffect(() => {
    if (data) {
      dispatch(setCartItems(data.items));
    }
 
  }, [data, dispatch]);

  const handleRemoveItem = async (productId: string) => {
    try {
     await removeItem({ productId }).unwrap();
    } catch (error) {
      console.error("Błąd podczas usuwania", error);
    }
  };
  
 
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 z-auto transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Koszyk
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Zamknij panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart?.length === 0 ? (
                          <li className="py-6">
                            <div className="text-center  text-gray-500">
                              Twój koszyk jest pusty
                            </div>
                          </li>
                        ) : (
                          cart?.map((item) => (
                            <li key={item.productId} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                  alt={item.name}
                                  src={`http://localhost:5000/${item.images[0]}`}
                                  className=" "
                                  width={1000}
                                  height={1000}
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <Link href={`/produkty/${item.productId}`}>
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">{item.price} zł</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Ilość {item.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      onClick={() => handleRemoveItem(item.productId)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Usuń
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {cart && cart && cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Kwota</p>
                      <p>{data?.totalPrice} zł</p>
                    </div>

                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Przejdź do płatności
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        lub{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Kontynuuj zakupy
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
