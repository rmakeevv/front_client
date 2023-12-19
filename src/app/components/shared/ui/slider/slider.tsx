'use client'
import React, {FC} from 'react';
import cls from './slider.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";


interface sliderProps {
    classname?: string;
    value?:string;
    classnameInput?:string;
    min?:string;
    max?:string;
    onInput?:any;
    classnameForTicks:string;
}

export const Slider:FC<sliderProps> = React.memo((props) => {
    const {
        classname,
        classnameInput,
        value,
        min,
        max,
        onInput,
        classnameForTicks
    } = props;


    return (
        <div className={classNames(cls.slider, {},[classname] )} >
            <input
                className={classnameInput}
                type="range"
                min={min}
                max={max}
                value={value}
                onInput={(e:any) => onInput(e.target.value)}
            />
        </div>
    );
});

export  default  Slider;
