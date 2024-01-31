    <template>
        
        <div>
            <h1 class="zoomInUp white-text">FamilyDocApp</h1>
        </div>
    </template> 

    <script>

    </script>
    <style>
    .zoomInUp {
    animation: zoomInUp 1s ease forwards;
    }
    .white-text {
  color: #fff; 
 
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