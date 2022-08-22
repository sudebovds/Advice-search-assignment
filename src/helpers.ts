import { BASE_URL, SEARCH_URL } from './const';
import { IFetchDataType, IAdviceInterface, IResultAdvicesInterface, IResultAdvicesMessageInterface } from './types'

export const fetchData: IFetchDataType = async ({ 
    search = '', 
    setAdvice, 
    showedAdvices, 
    setShowedAdvices,
    setResults
  }) => {
    const formFetchDataUrl = search !== '' ? `${SEARCH_URL}${search}` : BASE_URL;

    if(search !== '' && setResults){
        const adviceData = await fetch(formFetchDataUrl).then((response) => response.json())
        .then(data => data)
        .catch((e) => console.error(e));
    
        if(adviceData.slips){
            setResults(adviceData);
        }else{
            setResults({
                slips: [
                    {
                        id: -1,
                        advice: adviceData.message.text
                    }
                ]
            })
        }
    }
    else{
        const adviceData: IAdviceInterface = await fetch(formFetchDataUrl).then((response) => response.json())
        .then(data => data)
        .catch((e) => console.error(e));
    
        if(adviceData){
          if(adviceData.slip.id in showedAdvices) {
            fetchData({
              search, 
              setAdvice, 
              showedAdvices, 
              setShowedAdvices
            })
          }
          else {
            setAdvice(adviceData.slip.advice);
            setShowedAdvices((prev: Array<number>) => [...prev, adviceData.slip.id]);
          }
        }
    }
  }