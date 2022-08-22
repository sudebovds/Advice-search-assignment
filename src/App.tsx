import { FC, FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { fetchData } from "./helpers";

// Types
import { IResultAdvicesInterface} from "./types";

// Consts
import { LIMIT_OF_ADVICES } from "./const";

const App: FC = () => {
  const [term, setTerm] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [advice, setAdvice] = useState<string | undefined>('');
  const [showedAdvices, setShowedAdvices] = useState<Array<number>>([]);
  const [results, setResults] = useState<IResultAdvicesInterface>();

  useEffect(() => { 
    const search = '';

    fetchData({ 
      search, 
      setAdvice, 
      showedAdvices, 
      setShowedAdvices 
    })

    return setShowedAdvices([])
  }, []);

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const search = '';

    setDisabledInput(true)

    setTimeout(() => {
      setDisabledInput(false);
    }, 3600) // Prevent from autoclic 
    
    fetchData({ 
      search, 
      setAdvice, 
      showedAdvices, 
      setShowedAdvices 
    })
  }

const termChangeHandler =(e: FormEvent<HTMLInputElement>) => {
  setTerm(`${e.currentTarget.value.trimStart()}`)
}

const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setDisabledSearch(true)

    setTimeout(() => {
      setDisabledSearch(false);
    }, 3600) // Prevent from autoclic 

      if(term !== ''){
        fetchData({search: term, setAdvice, showedAdvices, setShowedAdvices, setResults});
      }
      else{
        setResults({
          slips: [
            {
              id: -1,
              advice: 'Error: You need to ask an advice!'
            }
          ]
        })
      }
  }

  return (
    showedAdvices.length <= LIMIT_OF_ADVICES ? (<main>
      <h1>Are you looking for advice?</h1>

      {(<p>"{advice}"</p>)}

      <form>
        {
          disabledInput ? 
          <h3>Think about this advice!</h3> : 
          <button onClick={onClick}>Gimme more advice!</button>
        }
      </form>

      <br />

      <form onSubmit={onSubmit}>
        <p>Search for more advice:</p>
        <input type="text" name="term" value={term} onChange={termChangeHandler} />
        <button disabled={disabledSearch}>Search</button>
      </form>

     {    
        results &&   
        (
          <ul>
            {results?.slips?.map((result) => (
              result.id === -1 ? 
              <h2 key={result.id} style={{color: 'red'}}>{result.advice}</h2> :
              <li key={result?.id}>{result?.advice}</li>
            ))}
          </ul>
        )
      }
    </main>) :
    <h1>{`It's enough advices for today! `}</h1>
  );
}


export default App;