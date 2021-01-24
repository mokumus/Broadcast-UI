/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Todo from './Todo'
import { useAuth } from '../contexts/AuthContext'
import md5 from 'md5-hash'


export default function TodoList() {

    const [todoList, setTodoList] = useState();
    const { currentUser } = useAuth()

    useEffect(() => {
      const todoRef = firebase.database().ref(md5(currentUser.email));
      todoRef.on('value', (snapshot) => {
        const todos = snapshot.val()
        const todoList = []
        //console.log(todos)
        var c = 0
        for (let i in todos){
          if (c != 0){
            //console.log(i)
            todoList.push([i, todos[i]] );
          }
          c++
        }
        console.log(todoList)
        setTodoList(todoList)

      })
    }, [])
  

    return (
    <div>  
        {todoList
          ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
          : '--'}
    </div>
    )

}