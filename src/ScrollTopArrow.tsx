import * as React from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';



export default function ScrollTopArrow() {

    const [showScroll, setShowScroll] = React.useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)


    return (
        <ArrowCircleUpIcon
            onClick={scrollTop}
            sx={{
                position: 'fixed',
                height: '60px',
                fontSize: '50px',
                bottom: '20px',
                left: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                cursor: 'pointer',
                animation: 'fadeIn 0.3s',
                transition: 'opacity 0.4s',
                opacity: 0.5
            }}
            style={{ display: showScroll ? 'flex' : 'none' }}
        ></ArrowCircleUpIcon>
    )
}