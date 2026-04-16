<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue"
import { useElementSize } from "@vueuse/core";

// CodeMirror 6
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { sql } from "@codemirror/lang-sql";

const props = withDefaults(defineProps<{
  modelValue: string
  title?: string
  placeholder?: string
  minHeight?: string
}>(), {
  minHeight: "300px",
})

const emit = defineEmits(["update:modelValue"])

const textareaRef = ref<HTMLElement | null>(null)
const editorRef = ref<HTMLElement | null>(null)
const { width } = useElementSize(editorRef)

const maxWidth = computed(() => {
  if (!editorRef.value) return "100%"
  const style = getComputedStyle(editorRef.value)
  const paddingLeft = parseFloat(style.paddingLeft) || 0
  const paddingRight = parseFloat(style.paddingRight) || 0
  return `${width.value - paddingLeft - paddingRight}px`
})

let view: EditorView | null = null

onMounted(() => {
  if (!textareaRef.value) return

  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      sql(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emit("update:modelValue", update.state.doc.toString())
        }
      }),
    ]
  })      

  view = new EditorView({
    state,
    parent: textareaRef.value,
  })
})

// Sync externe -> editor
watch(
  () => props.modelValue,
  (newVal) => {
    if (!view) return
    const current = view.state.doc.toString()
    if (newVal !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: newVal },
      })
    }
  }
)
</script>

<template>

  <div ref="editorRef" class="fr-container--fluid code-editor">
    <!-- Header -->
    <div class="fr-grid-row header fr-mb-4v fr-grid-row--gutter">
      <div class="title"><span class="fr-icon-menu-2-fill fr-mr-2v"></span>{{ title }}</div>
      <div class="actions">
        <slot name="right" />
      </div>
    </div>
    <!-- Editor -->
    <div ref="textareaRef" class=" fr-input textarea">
    </div>
  </div>
</template>


<style scoped>
.code-editor {
  width : 100%;
  height: auto;
}

/* Header */
.header {
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 8px;
}
.textarea {
  max-width: v-bind(maxWidth);
  min-width: v-bind(maxWidth);
  height: auto !important;
  min-height: v-bind(minHeight);
  overflow: auto;
} 

.textarea :deep(.cm-editor) {
  min-height: calc(v-bind(minHeight) - 16px);
}

.textarea :deep(.cm-content) {
  min-height: calc(v-bind(minHeight) - 30px);
}
</style>