import Head from 'next/head'
import {useState} from 'react'
import styles from "./index.module.css";

export default function Home() {

  const [count, setCounter] =useState(0);
  const [animalInput, setAnimalInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit (e) {
      e.preventDefault()
      try {
          if (count == 10) {
              return console.log("You've reached your limit");
          }
      const response = await fetch("api/generate", {
          method: "POST",
          headers: {
              "Content_Type": "application/json",
          },
          body: JSON.stringify({animal:animalInput})
      });
      
      const data = await response.json();
      if (response.status !== 200) {
          throw data.error || new Error(`Request failed with  ${response.status}`);
      }

    setResult(data.result);
      setCounter(count + 1)
      setAnimalInput('');
      } catch(error){
          console.error(error);
          alert(error.message);
      }
    }

  return (

        <div className={styles.body}>
          <Head>

            <title>Create Next App</title>

            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <h1>This is our AI app</h1>
            <img src='/favicon.ico' className={styles.icon}/>
            <h3>Name of my Pet</h3>
            <form onSubmit={onSubmit}>
              <input
              type='text'
              name='animal'
              value={animalInput}
              onChange={(e)=>{
                setAnimalInput(e.target.value)
                // console.log(animalInput)
              }
              }
              placeholder='Enter an animal'
             />
              <input
              type='submit'
              value="Generate names"

              />
            </form>
              <div className={styles.result}>{result}</div>
          </main>
        </div>

  )
}
