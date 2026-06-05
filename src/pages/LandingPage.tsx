import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-2xl pt-10">
        <p className="font-body text-sm text-[#424242] mb-3">안녕하세요 👋</p>
        <h1 className="font-heading text-4xl font-bold text-black leading-tight mb-4">
          저는 프론트엔드<br />개발자입니다.
        </h1>
        <p className="font-body text-base text-[#424242] leading-relaxed mb-8">
          사내·개인 프로젝트와 경력, 기술 스택을 이곳에 기록합니다.
          <br />
          새로운 것을 배우고 만드는 걸 좋아합니다.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className="font-body text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-[#424242] transition-colors cursor-pointer"
        >
          프로젝트 보기 →
        </button>
      </div>
    </Layout>
  );
}
