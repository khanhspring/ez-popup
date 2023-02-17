import { Placement } from '@floating-ui/react';
import { FC, ReactElement } from 'react';
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
    children: ReactElement;
};
declare const Popup: FC<Props>;
export default Popup;
