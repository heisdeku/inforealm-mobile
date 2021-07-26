import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function ShareIcon () {
    const svgMarkup = `<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.68268 11V19C1.68268 19.5304 1.89339 20.0391 2.26846 20.4142C2.64354 20.7893 3.15225 21 3.68268 21H15.6827C16.2131 21 16.7218 20.7893 17.0969 20.4142C17.472 20.0391 17.6827 19.5304 17.6827 19V11" stroke="#050618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.6827 5L9.68268 1L5.68268 5" stroke="#050618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.68268 1V14" stroke="#050618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    const SvgImage = () => <SvgXml xml={svgMarkup} width="24px" />

    return <SvgImage />
}