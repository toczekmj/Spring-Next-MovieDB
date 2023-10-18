while true; do
    echo "Please choose an option:"
    echo "================AUTO SETUP================"
    echo "0) run autostart script "

    echo "==================SETUP=================="
    echo "1) Create Docker Image"
    echo "2) Create Docker Container"

    echo "==================LIST==================="
    echo "3) List Docker Images"
    echo "4) List running Docker Containers"

    echo "===================RUN==================="
    echo "5) Run Docker Container"
    echo "6) Stop Docker Container"

    echo "==================DELETE=================="
    echo "7) Delete Docker Container"
    echo "8) Delete Docker Image"
    echo "9) Delete Docker image and container"
    echo "===================EXIT==================="
    echo "10) Exit script"

    read -p "Enter the option number: " choice

    case $choice in
        0)
          default_image_name="spring-boot-image"
          default_container_name="spring-boot-container"

          if [[ "$(docker images -q $default_image_name 2> /dev/null)" == "" ]]; then
            echo "Default image not found! Creating '$default_image_name'..."
            docker build --tag "$default_image_name" .
          else
            echo "Default image already exist. Skipping..."
          fi

          if ! docker ps -a --filter "name=$default_container_name" --format "{{.Names}}" | grep -q "$default_container_name"; then
              echo "Default container not found! Creating '$default_container_name'..."
              docker run -d -p 8080:8080 --name "$default_container_name" "$default_image_name"
          else
            echo "Default container already exist. Skipping..."
          fi

          echo "Starting '$default_container_name' container..."
          docker start "$default_container_name"
          ;;
        1)
          read -p "Enter the name for the Docker Image (default: spring-boot-image): " img_name
          img_name=${container_name:-spring-boot-image}
          docker build --tag "$img_name" .
          ;;
        2)
            read -p "Enter the name for the Docker Container (default: spring-boot-container): " container_name
            read -p "Enter the name for the Docker Image (default: spring-boot-image): " img_name
            img_name=${container_name:-spring-boot-image}
            container_name=${container_name:-spring-boot-container}
            docker run -d -p 8080:8080 --name "$container_name" "$img_name"
            ;;
        3)
              docker images -a
              docker ps
              ;;
        4)
            echo "List of running Docker Containers:"
            docker ps
            ;;
        5)
            read -p "Enter the name of the Docker Container to run (default: spring-boot-container): " container_name
            container_name=${container_name:-spring-boot-container}
            docker start "$container_name"
            ;;
        6)
            read -p "Enter the name of the Docker Container to stop (default: spring-boot-container): " container_name
            container_name=${container_name:-spring-boot-container}
            docker stop "$container_name"
            ;;
        7)
            read -p "Enter the name of the Docker Container to delete: " container_name
            docker stop "$container_name"
            docker rm "$container_name"
            ;;
        8)
            read -p "Enter the name of the Docker Image to Delete: " img_name
            docker image rm "$img_name"
            ;;
        9)
            read -p "Enter the name for the Docker Container (default: spring-boot-container): " container_name
            read -p "Enter the name for the Docker Image (default: spring-boot-image): " img_name
            img_name=${container_name:-spring-boot-image}
            container_name=${container_name:-spring-boot-container}
            docker stop "$container_name"
            docker rm "$container_name"
            docker image rm "$img_name"
            ;;
        10)
            echo "Exiting script."
            exit 0
            ;;
        *)
            echo "Invalid option. Please choose a valid option (1-5)."
            ;;
    esac
    read -p "Press enter to continue"
    echo ""
    echo ""
    echo ""
    echo ""
    echo ""
done

