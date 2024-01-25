    <template>
        
        <div>
            <h1 class="zoomInUp">FamilyDocApp</h1>
        </div>
    </template>

    <script>
    import { useApplicationStore } from '@/stores/application.js';

const {  userData } = useApplicationStore();
console.log(userData.value);

    </script>
    <style>
    .zoomInUp {
    animation: zoomInUp 1s ease forwards;
    }

    @keyframes zoomInUp {
    from {
        opacity: 0;
        transform: translateY(-150px);
    }
    to {
        opacity: 1;
        transform: translateY(-200px);
    }
    }
    </style>