'use client';
import React, { FC } from 'react';
import cls from './checkLogin.module.scss';

interface checkLoginProps {
    checked: boolean;
    classname?: string;
    onChange?: any;
    children?: any;
}

export const CheckLogin: FC<checkLoginProps> = (props) => {
    const { checked, onChange, children } = props;

    const [isChecked, setIsChecked] = React.useState(checked);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <label className={cls.checkCover}>
            <input
                className={cls.check}
                type='checkbox'
                checked={checked}
                onChange={handleChange}
            />
            <span className={cls.checkCustom}></span>
            {children}
        </label>
    );
};
export default CheckLogin;
