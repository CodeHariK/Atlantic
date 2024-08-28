import './rainbox.css';

export const RainboxText = () => (
    <span class="rainbow"><slot /></span>
);

interface Props {
    size: string;
    src: string;
}

export const RainboxImage = (props: Props) => (
    <div
        class="raincon"
        style={{
            "--size": props.size,
            "--src": props.src,
        }}>
        <div class="rainbow_grad">
            <slot />
        </div>
    </div>
);