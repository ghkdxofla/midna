from server.service.analysis.value_object.chart_data import ChartData


def extract_sequences_from_fastq(fastq_content: str) -> list[str]:
    lines = fastq_content.split('\n')
    sequences = []

    for i in range(1, len(lines), 4):
        sequences.append(lines[i])

    return sequences

def levenshtein_distance(a: str, b: str) -> int:
    matrix = [[0 for _ in range(len(b) + 1)] for _ in range(len(a) + 1)]

    for i in range(len(a) + 1):
        matrix[i][0] = i
    for j in range(len(b) + 1):
        matrix[0][j] = j

    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                matrix[i][j] = matrix[i - 1][j - 1]
            else:
                matrix[i][j] = min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + 1)

    return matrix[len(a)][len(b)]

def calculate_similarity_score(sequence: str, subsequence: str, threshold: int) -> int:
    count = 0
    for i in range(len(sequence) - len(subsequence) + 1):
        substring = sequence[i:i+len(subsequence)]
        if levenshtein_distance(substring, subsequence) <= threshold:
            count += 1
    return count

def format_chart_data(analysis_result: dict[str, list[dict[str, int]]]) -> list[ChartData]:
    chart_data = []
    for disease, scores in analysis_result.items():
        formatted_data = {'disease': disease}
        for i, score in enumerate(scores):
            formatted_data[f'sequence{i+1}'] = score['total']
        chart_data.append(ChartData(**formatted_data))
    return chart_data
