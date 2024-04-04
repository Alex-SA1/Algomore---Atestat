import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next/types";

export async function runCode(cppCode: string, input: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const compileCommand = 'g++ -o tempCode -x c++ -';
  
      const executionCommand = 'tempCode';
  
      const compileProcess = exec(compileCommand, (compileError, compileStderr) => {
        if (compileError) {
          reject(`Compilation Error: ${compileStderr}`);
        } else {
          const executionProcess = exec(executionCommand, (executionError, executionStdout, executionStderr) => {
            if (executionError) {
              console.error(`Execution Error: ${executionStderr}`);
              reject(`Execution Error: ${executionStderr}`);
            } else {
              resolve(executionStdout);
            }
          });

         
          executionProcess.stdin?.write(input);
          executionProcess.stdin?.end();
        }
      });
  
      compileProcess.stdin?.write(cppCode);
      compileProcess.stdin?.end();
    });
  }
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { cppCode, input } = req.body;
  
    try {
      const result = await runCode(cppCode, input);
      res.status(200).json({ result });
    } catch (error) {
      console.error('Error running tests: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  