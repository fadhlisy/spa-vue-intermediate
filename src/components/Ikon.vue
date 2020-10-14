<template>
    <svg :class="`icon-${ nama }`" :viewBox="box">
        <path :d="path"/>
        <slot></slot>
    </svg>
</template>

<script>
export default {
    props: {
        nama: {
            type: String,
            required: true
        },
        box: {
            type: String,
            required: true
        },
        path: {
            type: String
        }
    }
}
</script>