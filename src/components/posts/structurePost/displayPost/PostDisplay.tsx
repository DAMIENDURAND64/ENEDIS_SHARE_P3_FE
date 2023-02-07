/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TPost, TSpace } from "../../../../types/main";
import { postFetcher } from "../../../../utils/fetcher";
import ProfilePic from "../../../structureShared/ProfilePic";
import CategoryPost from "./CategoryPost";
import DatePost from "./DatePost";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";
import TitlePost from "./TitlePost";

interface IProps {
  oneSpace: TSpace;
}

function PostDisplay({ oneSpace }: IProps) {
  const [postAllCategories, setPostAllCategories] = useState<TPost>();
  const { isLoading } = useQuery(
    ["latestPost", `${oneSpace.id}`],
    () =>
      postFetcher.getLatestPostBySpaceWithImage({
        spaceId: oneSpace.id,
      }),
    {
      onSuccess: (d) => {
        setPostAllCategories(d[0]);
      },
    }
  );

  if (isLoading) {
    return <div>En chargement</div>;
  }

  if (
    !postAllCategories ||
    !postAllCategories.category ||
    !postAllCategories.author
  ) {
    return (
      <div className="w-full h-full p-5 flex-x-center mt-20 text-mob-md(CTA+input)">
        Aucune publication dans cet espace :
        <br />
        <span className="text-mob-xl(headers+titles) font-bold">
          choisissez une catégorie et publiez !
        </span>
      </div>
    );
  }

  return (
    <div className="relative px-4 py-3">
      <div className="flex mb-[10px]">
        <ProfilePic
          firstname={postAllCategories.author.firstname}
          lastname={postAllCategories.author.lastname}
          imageUrl={postAllCategories.author.imageUrl}
          id={postAllCategories.author.id}
        />
        <TitlePost title={postAllCategories.title} />
      </div>
      <div className="w-full flex justify-between">
        <TextPost text={postAllCategories.content} />
        <div className="w-[38%] min-w-[130px] lg:min-w-[145px] xl:min-w-[160px] h-[208px] flex flex-col justify-between ml-3">
          <div className="flex items-center justify-between">
            <CategoryPost
              isGeneral={postAllCategories.category.isGeneral}
              categoryName={postAllCategories.category.name}
              categoryId={postAllCategories.category.id}
              spaceId={oneSpace.id}
            />
            <DatePost datePost={postAllCategories.createdAt} />
          </div>
          {postAllCategories.images?.length === 1 && (
            <ImagePost
              srcImage={postAllCategories.images[0]!.url}
              nameImage={postAllCategories.images[0]!.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDisplay;
