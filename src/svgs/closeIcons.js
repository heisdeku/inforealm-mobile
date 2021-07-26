import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function CloseIcon({ action }) {
    const svgMarkup = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 8.586L7.172 5.757L5.757 7.172L8.586 10L5.757 12.828L7.172 14.243L10 11.414L12.828 14.243L14.243 12.828L11.414 10L14.243 7.172L12.828 5.757L10 8.586Z" fill="#2B2D42"/>
    </svg>
    `
    const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />

    return <SvgImage />
}