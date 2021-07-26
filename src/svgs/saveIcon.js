import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function SaveIcon({ color }) {
    const svgMarkup = `<svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 32.8571L14 24.2857L2 32.8571V5.42857C2 4.51926 2.36122 3.64719 3.00421 3.00421C3.64719 2.36122 4.51926 2 5.42857 2H22.5714C23.4807 2 24.3528 2.36122 24.9958 3.00421C25.6388 3.64719 26 4.51926 26 5.42857V32.8571Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    `
    const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />

    return <SvgImage />
}