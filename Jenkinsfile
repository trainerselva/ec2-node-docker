pipeline {
    agent any
    environment {
        // The Docker Hub repository to store the built image
        DOCKER_IMAGE = 'yourdockerhub/ec2-node-docker'
        // The Private or Public IP of the target deployment EC2 instance
        TARGET_EC2_IP = '10.0.1.50' 
    }
    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Execute Tests') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root:root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
                // CONDITIONAL GATE: A test failure returns a non-zero exit code, aborting the pipeline.
                sh 'npm test' 
            }
        }
        
        // The pipeline only reaches this point if all tests pass.
        
        stage('Build & Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "echo \$PASS | docker login -u \$USER --password-stdin"
                    sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_NUMBER} ."
                    sh "docker push ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }
        
        stage('Deploy to Target EC2') {
            steps {
                // Use the SSH Agent plugin to connect to the target EC2 instance
                sshagent(['target-ec2-key']) {
                    // 1. Disable strict host key checking to prevent interactive prompts
                    // 2. Stop and remove the old running container (if it exists)
                    // 3. Pull the newly pushed image from Docker Hub
                    // 4. Run the new container, mapping host port 3000 to container port 3000
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${TARGET_EC2_IP} '
                            docker stop node-app || true
                            docker rm node-app || true
                            docker pull ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                            docker run -d -p 3000:3000 --name node-app ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                        '
                    """
                }
            }
        }
    }
}
