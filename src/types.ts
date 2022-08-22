import { Dispatch, SetStateAction } from 'react'

export interface IFetchDataInterface{
    setAdvice: Dispatch<SetStateAction<string | undefined>>;
    setShowedAdvices: Dispatch<SetStateAction<Array<number>>>;
    showedAdvices: Array<number>;
    search?: string;
    setResults?: Dispatch<SetStateAction<IResultAdvicesInterface | undefined>>; 
  }
  
export type IFetchDataType = (data: IFetchDataInterface) => Promise<void>;

type ISlipType = {
    id: number;
    advice?: string
}

type ISlipsMessage = {
    type: string;
    message: string;
}
  
export interface IAdviceInterface{
    slip: ISlipType
  }

export interface IResultAdvicesInterface{
    slips: ISlipType[] | undefined;
}

export interface IResultAdvicesMessageInterface{
    message: ISlipsMessage;
}

