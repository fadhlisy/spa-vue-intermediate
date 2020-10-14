<template>
    <button :class="`btn-${ nama }`" @click.prevent="aksi" :disbaled="nonaktif">
        <slot name="kanan"></slot>
        {{ label }}
        <slot name="kiri"></slot>
    </button>
</template>

<script>
export default {
    props: {
        nama: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        nonaktif: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        aksi() {
            this.$emit('klik')
        }
    }
}
</script>