pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.55.0-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            git url: 'https://github.com/djgarciab/playwright-e2e.git', branch: 'main'
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
   post{
       always{
           publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
				reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
               ])
       }
   }
}