<template>
    <div :class="`user-${ nama }`">
        <slot></slot>
    </div>
</template>

<script>

export default {
    props: {
        nama: {
            type: String,
            required: true
        }
    }
}
</script>