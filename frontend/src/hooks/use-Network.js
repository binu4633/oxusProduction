import { useState,useEffect } from "react";

function useNetwork(){
    const [state,setState] = useState({
        since:'undifined',
        onLine:navigator.onLine
    })
}