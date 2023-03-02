import React, { useState } from 'react'

const OPENAI_API_KEY = ''
const OPENAI_MODEL = 'text-davinci-002'


function MBTI_test() {
    const [personalityInput, setPersonalityInput] = useState('')
    const [result, setResult] = useState('')
    const [mbti, setMbti] = useState('')

    async function handleMbtiButtonClick() {
        // 성격묘사를 ChatGPT API에 전송하여 MBTI 유형 예측
        try {
            const mbtiApiResponse = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + OPENAI_API_KEY,
                },
                body: JSON.stringify(
                    {
                        prompt: `Please provide the personality description described later in MBTI code with description as JSON Object like {"code":" ","desc":" "} 
                                 \n\n
                                 personality : ${personalityInput} 
                                 `,

                        model: OPENAI_MODEL,
                        max_tokens: 2048,
                    }
                ),
            })
            const mbtiApiResponseJson = await mbtiApiResponse.json()

            // 예측된 MBTI 코드에 해당하는 결과와 설명
            const { code, desc, } = JSON.parse(mbtiApiResponseJson.choices[0].text)
            if (desc) {
                setMbti(code)
                setResult(`${desc}`)
            } else {
                setMbti('?')
                setResult('알 수 없는 유형입니다 😕')
            }

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>MBTI 유형 예측기</h1>
            <div>
                <label htmlFor="personalityInput">성격 : </label>
                <input
                    style={{ width: "1000px", }}
                    type="text"
                    id="personalityInput"
                    value={personalityInput}
                    onChange={(e) => setPersonalityInput(e.target.value)}
                />
            </div>
            <div>
                <button style={{ margin: '10px' }} onClick={handleMbtiButtonClick}>MBTI 확인</button>
            </div>
            <div style={{ width: '800px', height: '800px', overflow: 'auto', margin: '10px' }}>
                {mbti && <div style={{ fontSize: '30px', marginBottom: '10px' }} > {mbti}</div>}
                {result && <div style={{}} >{result}</div>}
            </div>

        </div>
    )
}

export default MBTI_test