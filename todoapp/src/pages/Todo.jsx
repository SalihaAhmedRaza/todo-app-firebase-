

// // import React, { useEffect, useRef, useState } from 'react';
// // import { auth, db } from '../Firebase/config';
// // import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

// // const Todo = () => {
// //     const todoInput = useRef();
// //     const [todos, setTodos] = useState([]);
    
// //     const [editTodoId, setEditTodoId] = useState(null); // State for tracking the todo being edited


// //     useEffect(() => {
// //         const unsubscribe = () => {
// //             if (!auth.currentUser) return; // Ensure user is authenticated

// //             const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));
// //             const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
// //                 const todosArray = [];
// //                 querySnapshot.forEach((doc) => {
// //                     todosArray.push({
// //                         ...doc.data(),
// //                         docid: doc.id
// //                     });
// //                 });
// //                 setTodos(todosArray); // Set state with the new array
// //             });

// //             return unsubscribeSnapshot; // Cleanup listener on unmount
// //         };

// //         const unsubscribeUser = auth.onAuthStateChanged((user) => {
// //             if (user) {
// //                 unsubscribe();
// //             }
// //         });

// //         return () => unsubscribeUser(); // Cleanup user listener
// //     }, []); // No dependencies to ensure it runs once

// //     const addTodo = async (event) => {
// //         event.preventDefault();
// //         const todoValue = todoInput.current.value.trim();

// //         if (!auth.currentUser) {
// //             console.error("User is not authenticated.");
// //             return;
// //         }

// //         if (!todoValue) {
// //             console.log("Todo cannot be empty");
// //             return;
// //         }

// //         console.log("Adding todo:", {
// //             title: todoValue,
// //             uid: auth.currentUser.uid
// //         });

// //         try {
// //             const docRef = await addDoc(collection(db, "todo"), {
// //                 title: todoValue,
// //                 uid: auth.currentUser.uid
// //             });
// //             console.log("Document written with ID: ", docRef.id);

// //             // Clear the input
// //             todoInput.current.value = '';
// //         } catch (e) {
// //             console.error("Error adding document: ", e);
// //         }
// //     };

// //     const deleteTodo = async (docid) => {
// //         try {
// //             await deleteDoc(doc(db, "todo", docid));
// //             console.log("Document deleted with ID: ", docid);
// //         } catch (e) {
// //             console.error("Error deleting document: ", e);
// //         }
// //     };
    

// //     return (
// //         <div>
// //             <h1 className='text-center mt-5'>Todo App</h1>
// //             <form className='text-center mt-5' onSubmit={addTodo}>
// //                 <input type="text" placeholder='Enter todo' ref={todoInput}  />
// //                 <button type="submit">Add Todo</button>
// //             </form>
// //             <ol>
// //                 {todos.length > 0 ? (
// //                     todos.map(item => (
// //                         <li key={item.docid}>
// //                             {item.title}
// //                             <button onClick={() => deleteTodo(item.docid)}>Delete</button>
// //                         </li>
// //                     ))
// //                 ) : (
// //                     <h1>No Data Found...</h1>
// //                 )}
// //             </ol>
// //         </div>
// //     );
// // };

// // export default Todo;


// import React, { useEffect, useRef, useState } from 'react';
// import { auth, db } from '../Firebase/config';
// import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc } from "firebase/firestore";

// const Todo = () => {
//     const todoInput = useRef();
//     const [todos, setTodos] = useState([]);
//     const [editTodoId, setEditTodoId] = useState(null); // State for tracking the todo being edited

//     useEffect(() => {
//         const unsubscribe = () => {
//             if (!auth.currentUser) return; // Ensure user is authenticated

//             const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));
//             const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
//                 const todosArray = [];
//                 querySnapshot.forEach((doc) => {
//                     todosArray.push({
//                         ...doc.data(),
//                         docid: doc.id
//                     });
//                 });
//                 setTodos(todosArray); // Set state with the new array
//             });

//             return unsubscribeSnapshot; // Cleanup listener on unmount
//         };

//         const unsubscribeUser = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 unsubscribe();
//             }
//         });

//         return () => unsubscribeUser(); // Cleanup user listener
//     }, []); // No dependencies to ensure it runs once

//     const addTodo = async (event) => {
//         event.preventDefault();
//         const todoValue = todoInput.current.value.trim();

//         if (!auth.currentUser) {
//             console.error("User is not authenticated.");
//             return;
//         }

//         if (!todoValue) {
//             console.log("Todo cannot be empty");
//             return;
//         }

//         try {
//             const docRef = await addDoc(collection(db, "todo"), {
//                 title: todoValue,
//                 uid: auth.currentUser.uid
//             });
//             console.log("Document written with ID: ", docRef.id);
//             todoInput.current.value = '';
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     };

//     const deleteTodo = async (docid) => {
//         try {
//             await deleteDoc(doc(db, "todo", docid));
//             console.log("Document deleted with ID: ", docid);
//         } catch (e) {
//             console.error("Error deleting document: ", e);
//         }
//     };

//     const startEditing = (todo) => {
//         setEditTodoId(todo.docid);
//         todoInput.current.value = todo.title; // Populate input with the current todo title
//     };

//     const updateTodo = async (event) => {
//         event.preventDefault();
//         const todoValue = todoInput.current.value.trim();

//         if (!editTodoId) return;

//         try {
//             await updateDoc(doc(db, "todo", editTodoId), {
//                 title: todoValue,
//             });
//             console.log("Document updated with ID: ", editTodoId);
//             todoInput.current.value = '';
//             setEditTodoId(null); // Clear the editTodoId after updating
//         } catch (e) {
//             console.error("Error updating document: ", e);
//         }
//     };

//     return (
//         <div>
//             <h1 className='text-center mt-5'>Todo App</h1>
//             <form className='text-center mt-5' onSubmit={editTodoId ? updateTodo : addTodo}>
//                 <input type="text" placeholder='Enter todo' ref={todoInput} />
//                 <button type="submit">{editTodoId ? 'Update Todo' : 'Add Todo'}</button>
//             </form>
//             <ol>
//                 {todos.length > 0 ? (
//                     todos.map(item => (
//                         <li key={item.docid}>
//                             {item.title}
//                             <button onClick={() => startEditing(item)}>Edit</button>
//                             <button onClick={() => deleteTodo(item.docid)}>Delete</button>
//                         </li>
//                     ))
//                 ) : (
//                     <h1>No Data Found...</h1>
//                 )}
//             </ol>
//         </div>
//     );
// };

// export default Todo;

// import React, { useEffect, useState } from 'react';
// import { auth, db } from '../Firebase/config';
// import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
// import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

// const Todo = () => {
//     const [todos, setTodos] = useState([]);
//     const [editTodoId, setEditTodoId] = useState(null);
//     const [inputValue, setInputValue] = useState('');

//     useEffect(() => {
//         const unsubscribe = () => {
//             if (!auth.currentUser) return;

//             const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));
//             const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
//                 const todosArray = [];
//                 querySnapshot.forEach((doc) => {
//                     todosArray.push({
//                         ...doc.data(),
//                         docid: doc.id
//                     });
//                 });
//                 setTodos(todosArray);
//             });

//             return unsubscribeSnapshot;
//         };

//         const unsubscribeUser = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 unsubscribe();
//             }
//         });

//         return () => unsubscribeUser();
//     }, []);

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const addTodo = async (event) => {
//         event.preventDefault();
//         const todoValue = inputValue.trim();

//         if (!auth.currentUser) {
//             console.error("User is not authenticated.");
//             return;
//         }

//         if (!todoValue) {
//             console.log("Todo cannot be empty");
//             return;
//         }

//         try {
//             const docRef = await addDoc(collection(db, "todo"), {
//                 title: todoValue,
//                 uid: auth.currentUser.uid
//             });
//             console.log("Document written with ID: ", docRef.id);
//             setInputValue(''); // Clear the input
//         } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     };

//     const deleteTodo = async (docid) => {
//         try {
//             await deleteDoc(doc(db, "todo", docid));
//             console.log("Document deleted with ID: ", docid);
//         } catch (e) {
//             console.error("Error deleting document: ", e);
//         }
//     };

//     const startEditing = (todo) => {
//         setEditTodoId(todo.docid);
//         setInputValue(todo.title); // Populate input with the current todo title
//     };

//     const updateTodo = async (event) => {
//         event.preventDefault();
//         const todoValue = inputValue.trim();

//         if (!editTodoId) return;

//         try {
//             await updateDoc(doc(db, "todo", editTodoId), {
//                 title: todoValue,
//             });
//             console.log("Document updated with ID: ", editTodoId);
//             setInputValue(''); // Clear the input
//             setEditTodoId(null); // Reset the edit state
//         } catch (e) {
//             console.error("Error updating document: ", e);
//         }
//     };

//     return (
//         <div className=' w-[]'  >
//             <h1 className=' bg-black text-center mt-5 text-5xl text-white'>Todo App</h1>
//             <form className='text-center mt-5 text-5xl  ml-44  rounded-[100px]' onSubmit={editTodoId ? updateTodo : addTodo}>
//                 <input
//                   className=' bg-black text-white rounded-[100px] text-center '
//                     type="text"
//                     placeholder='Enter todo'
//                     value={inputValue}
//                     onChange={handleInputChange}
//                 />
//                 <button className='ml-10' type="submit">{editTodoId ? 'Update Todo' : 'Add Todo'}</button>
//             </form>
//             <ol>
//                 {todos.length > 0 ? (
//                     todos.map(item => (
//                         <li className='text-5xl bg-white text-black *: ml-[800px] text-center w-80 rounded-[50px] mt-5  flex gap-20' key={item.docid} >
//                             <span className='text-center' >{item.title}</span>
//                             <div>
//                                 <button onClick={() => startEditing(item)} style={{ border: 'none', background: 'transparent' }}>
//                                     <FaEdit />
//                                 </button>
//                                 <button onClick={() => deleteTodo(item.docid)} style={{ border: 'none', background: 'transparent' }}>
//                                     <FaTrash />
//                                 </button>
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <h1>No Data Found...</h1>
//                 )}
//             </ol>
//         </div>
//     );
// };

// export default Todo;



import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/config';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc } from "firebase/firestore";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [editTodoId, setEditTodoId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);

    useEffect(() => {
        const unsubscribe = () => {
            if (!auth.currentUser) return;

            const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));
            const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
                const todosArray = [];
                querySnapshot.forEach((doc) => {
                    todosArray.push({
                        ...doc.data(),
                        docid: doc.id
                    });
                });
                setTodos(todosArray);
            });

            return unsubscribeSnapshot;
        };

        const unsubscribeUser = auth.onAuthStateChanged((user) => {
            if (user) {
                unsubscribe();
            }
        });

        return () => unsubscribeUser();
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const addTodo = async (event) => {
        event.preventDefault();
        const todoValue = inputValue.trim();

        if (!auth.currentUser) {
            console.error("User is not authenticated.");
            return;
        }

        if (!todoValue) {
            console.log("Todo cannot be empty");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "todo"), {
                title: todoValue,
                uid: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
            setInputValue(''); // Clear the input
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const deleteTodo = async (docid) => {
        try {
            await deleteDoc(doc(db, "todo", docid));
            console.log("Document deleted with ID: ", docid);
            setIsDialogOpen(false); // Close dialog after deletion
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const confirmDelete = (todo) => {
        setTodoToDelete(todo);
        setIsDialogOpen(true);
    };

    const startEditing = (todo) => {
        setEditTodoId(todo.docid);
        setInputValue(todo.title); // Populate input with the current todo title
    };

    const updateTodo = async (event) => {
        event.preventDefault();
        const todoValue = inputValue.trim();

        if (!editTodoId) return;

        try {
            await updateDoc(doc(db, "todo", editTodoId), {
                title: todoValue,
            });
            console.log("Document updated with ID: ", editTodoId);
            setInputValue(''); // Clear the input
            setEditTodoId(null); // Reset the edit state
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    return (
        <div className='w-full'>
            <h1 className='bg-black text-center mt-5 text-5xl text-white'>Todo App</h1>
            <form className='text-center mt-5' onSubmit={editTodoId ? updateTodo : addTodo}>
                <input
                    className='bg-black text-white rounded-full text-center p-2'
                    type="text"
                    placeholder='Enter todo'
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className='ml-10 p-2 bg-blue-500 text-white rounded-full' type="submit">
                    {editTodoId ? 'Update Todo' : 'Add Todo'}
                </button>
            </form>
            <ol className='mt-5'>
                {todos.length > 0 ? (
                    todos.map(item => (
                        <li className='text-3xl bg-white text-black flex justify-between items-center p-3 rounded-full mt-3 shadow-lg' key={item.docid}>
                            <span>{item.title}</span>
                            <div>
                                <button onClick={() => startEditing(item)} className='mr-2'>
                                    <FaEdit />
                                </button>
                                <button onClick={() => confirmDelete(item)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <h1>No Data Found...</h1>
                )}
            </ol>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-lg mb-4">Are you sure you want to delete this todo?</h2>
                        <div className="flex justify-between">
                            <button 
                                onClick={() => deleteTodo(todoToDelete.docid)} 
                                className='bg-red-500 text-white rounded px-4 py-2'
                            >
                                Yes
                            </button>
                            <button 
                                onClick={() => setIsDialogOpen(false)} 
                                className='bg-gray-300 text-black rounded px-4 py-2'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
