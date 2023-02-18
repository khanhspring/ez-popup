import { Placement } from '@floating-ui/react';
import React, { ReactElement } from 'react';
import { Trigger } from '../models/types';
type Props = {
    content: string | ReactElement;
    placement?: Placement;
    trigger?: Trigger;
    className?: string;
    backdropClassName?: string;
    backdrop?: boolean;
    clickOutsideToClose?: boolean;
    open?: boolean;
    afterClose?: () => void;
    onOpenChange?: (open: boolean) => void;
    children: ReactElement;
};
declare const Popup: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export default Popup;
