import React from 'react'
import { BlocProps } from '../type'
import useTraductor from '@/features/multiLang/hooks/useTraductor'
import styles from './TextEditor.module.scss'
import { GlobalContainer, GlobalContent } from '@/components/atoms/container/GlobalContainer/GlobalContainer'

export default function TextEditor({content, gsap}:BlocProps ) {
    const { editor_content} = content
    const{getTextObjectTraduction} = useTraductor()
    const contentConverted = editor_content ? getTextObjectTraduction(editor_content) : ''
  return (
    <GlobalContainer padding={true}>
    <GlobalContent >
        <div className={styles.global_container} dangerouslySetInnerHTML={{__html: contentConverted}}/>
    </GlobalContent>
    </GlobalContainer>
  )
}
