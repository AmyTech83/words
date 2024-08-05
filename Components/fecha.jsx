import {format} from "date-fns";

import { es } from 'date-fns/locale';
export default function Fecha({dateString}){
    const date = new Date(dateString);
    return <time dateTime={dateString}>{format(date,"EEEE dd 'de' MMMM, HH:HH",{ locale: es })}</time>
}