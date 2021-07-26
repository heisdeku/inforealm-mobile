import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function Send({ action }) {
    const svgMarkup = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="#050618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#050618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    const SvgImage = () => <SvgXml xml={svgMarkup} width="30px" />

    return <SvgImage />
}