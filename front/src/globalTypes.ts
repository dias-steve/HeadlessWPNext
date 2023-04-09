
/*=============================================
=            GlobalType            =
=============================================*/


export interface BtnProps{
    label: string;
    handleClick: any;
    available: boolean;
}

export interface BtnWithWaitingProp extends BtnProps{
    isLoading: boolean;
}

export interface IError{
    message: string;
    type: string;
    statusCode: number | null;
}

export interface IErrorDisplay {
    message: string | null;
    title: string;
}

export interface ErrorMessageMapper {
    [typeErrorId: string]:{
        [lang: string] :IErrorDisplay
    }
}

