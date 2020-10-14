<template>
    <div class="editor-preview">
        <div class="preview-result">
            <Kode nama="preview">
                <data-code
                    :code="kode"
                    :lang="bahasaPemrograman"
                    :is-highlighted="apakahSorotanMenyala"
                />
            </Kode>
        </div>
    </div>
</template>

<script>
import { validator } from '../../utils'
import Kode from '../Kode'

export default {
    components: {
        Kode
    },
    props: {
        kode: {
            default: '',
            required: true,
            validator
        },
        bahasaPemrograman: {
            default: '',
            required: true,
            validator
        },
        apakahSorotanMenyala: {
            type: Number,
            default: 1
        }
    }
}
</script>