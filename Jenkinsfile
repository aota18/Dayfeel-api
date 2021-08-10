pipeline {
    agent any

     //Cron Syntax
     // drive this pipeline every 3 minutes
    triggers {
        pollSCM('*/2 * * * *')
    }

    // Credentials file 
    environment {
        AWS_ACCESS_KEY_ID = credentials('awsAccessKeyId')
        AWS_SECRET_ACCESS_KEY = credentials('awsSecretAccessKey')
        AWS_DEFAULT_REGION = 'ap-northeast-2'
        APP_NAME='weather-forecast-server'
        HOME = '.' // Avoid npm root owned
        SLACK_CHANNEL='#deploy-alert'
    }
    
    stages {
        // Download Repository

        stage('Prepare'){
            agent any

            steps {
                echo "Let's start Long Journey ! 🙌 "
                echo "Clonning Repository..."

                git url: "https://github.com/aota18/weather-forecast-api.git",
                    branch: 'master',
                    credentialsId: 'github'
            }


            // Define the behavior after above steps
            post {
                //If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.

                success {
                    echo 'Successfully Cloned Repository'
                }

                always {
                    echo "I tried..."
                }

                cleanup {
                    echo "after all other post conditipon"
                }
            }
        }

    
        stage('Build Backend') {
             agent {
            docker {
                image 'node:latest'
            }
        }

        steps {
            echo 'Build Backend'

            sh 'npm install'
            sh 'npm run build'
        }

        post {
            failure {
                error "This pipeline stops here..."
            }
        }
        }

        stage('Build Docker'){
        agent any

        steps {
            dir('./'){
                sh 'docker build . -t weather-forecast-api'
            }
        }
    }

        stage('Deploy Backend'){
            agent any

            steps {
                echo 'Deploy Backend'

                sh 'docker ps -f name=weather-forecast-api -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=weather-forecast-api -q | xargs -r docker container rm'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh '''
                docker run -p 80:3000 -d -v 'env:/usr/share' --name weather-forecast-api weather-forecast-api
                '''

            }

          
        }

    

       

    }
}